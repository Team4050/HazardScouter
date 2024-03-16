import type { MatchDataType } from "../store/schema";
import {
  useAutoStore,
  useEndGameStore,
  usePostMatchStore,
  usePreMatchStore,
  useTeleopStore,
} from "../store/useDataStore";

export default function useCompiledData(): MatchDataType {
  const { data: preMatch } = usePreMatchStore();
  const { data: auto } = useAutoStore();
  const { data: teleop } = useTeleopStore();
  const { data: endGame } = useEndGameStore();
  const { data: postMatch } = usePostMatchStore();

  return { preMatch, auto, teleop, endGame, postMatch };
}
